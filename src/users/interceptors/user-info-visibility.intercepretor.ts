import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";
import { User } from "../entities/user.entity";
import { UsersService } from "../users.service";

@Injectable()
export class UserInfoVisibilityIntercepretor implements NestInterceptor {
    constructor(private usersService: UsersService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();

        return next.handle().pipe(map ( async flow => {
            if (flow instanceof User) {
                return await this.filterUserInfo(flow, req.user);
                    // Array.isArray([1, 2, 3]);   true
                    // Array.isArray({foo: 123});  false
                    // Array.isArray('foobar');    false
                    // Array.isArray(undefined);   false
            } else if (Array.isArray(flow)) {
                for (let i = 0;i < flow.length;i++) {
                    if (flow[i] instanceof User) {
                        flow[i] = await this.filterUserInfo(flow[i], req.user);
                    }
                }
            }
            return flow;
        }) );
    }

    async filterUserInfo(user: User, reqUser: User): Promise<User> {
        if (user.id !== +reqUser.id) {
            const friendship = await this.usersService.getFriendship(+reqUser.id, user.id);
            // let myname = '';
            // !!myname // = flase
            // let myname = 'saifhany';
            // !!myname // = true
            const areFriends = !!friendship; 
            if (!areFriends) {
                const visibilitySettings = await this.usersService.getVisibilitySettings(user.id);
                if (!visibilitySettings.experienceVisible) {
                    delete user.experiences;
                }
                if (!visibilitySettings.educationVisible) {
                    delete user.educations;
                }
                if (!visibilitySettings.skillsVisible) {
                    delete user.skills;
                }
            }
        }
        return user;
    }

}