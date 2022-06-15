import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entity/user/user.entity';
import { UsersDTO } from 'src/dto/userdto';
import { v4 as uuidv4 } from 'uuid';
import { CODE } from 'src/code/code';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';
import { registerDTO } from 'src/dto/authdto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  /**
   * 通过邮箱：查找用户
   * @param email 用户邮箱
   * @returns
   */
  async findByEmail(email: string): Promise<UsersDTO> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  /**
   * 通过用户唯一id查找用户
   * @param uuid 用户唯一id
   * @returns
   */
  async findOne(uuid: string): Promise<UsersDTO> {
    return await this.userRepository.findOne({
      where: {
        uuid: uuid,
      },
    });
  }

  /**
   * 根据用户email 和 data来更新
   * @param email 用户email地址
   * @param data  要变更的信息
   * @returns
   */
  async updateUser(email: string, data: Partial<UsersDTO>) {
    await this.userRepository.update({ email }, data);
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  /**
   * 根据用户邮箱删除用户
   * @param email 用户邮箱
   * @returns
   */
  async deleteUser(email: string) {
    await this.userRepository.delete({ email });
    return {
      code: CODE.HTTP_OK,
      message: '删除成功',
    };
  }

  /**
   * 清空数据库中user表中所有数据
   */
  async clearUser(isClearAll: boolean) {
    if (isClearAll) {
      await this.userRepository.clear();
      return {
        code: CODE.HTTP_OK,
        message: '清空user表成功',
      };
    }
  }

  /**
   * 注册用户
   * @param body 注册用户体
   * @returns
   */
  async authRegister(body: registerDTO) {
    const { email, password } = body;
    const userExist = await this.findByEmail(email);
    console.log(userExist);

    if (userExist) {
      return {
        HttpStatus: CODE.HTTP_CREATED,
        message: '用户已经存在',
      };
    }
    const uuid = uuidv4();

    // 加盐加密
    const salt = makeSalt();
    const hashPwd = encryptPassword(password, salt);
    Object.keys(body).forEach((item) => {
      if (item === 'password') body[item] = hashPwd;
    });
    const reqBody = Object.assign({ uuid, salt }, body);

    return this.userRepository.save(reqBody);
  }
}
