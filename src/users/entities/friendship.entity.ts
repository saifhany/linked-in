import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Friendship {
    @PrimaryGeneratedColumn()
    id: number;

    // User who sent the friend request to user2
    @ManyToOne(() => User, user => user.friendsAdded, { eager: true, onDelete: 'CASCADE' })
    user1: User;

    // User who accepted the friend request from user1
    @ManyToOne(() => User, user => user.friendsAccepted, { eager: true, onDelete: 'CASCADE' })
    user2: User;

    @CreateDateColumn()
    since: Date;
}