import { Room } from "../room/room.entity";
import { User } from "../user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    message: string;

    @Column({default: false})
    isClosed: boolean;

    @ManyToOne(() => User, (user) => user.messages)
    user: User;
  
    @ManyToOne(() => Room, (room) => room.messages)
    room: Room;

}