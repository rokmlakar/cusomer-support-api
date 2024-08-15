import { Room } from "../room/room.entity";
import { User } from "../user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @Column({ default: false })
    isClosed: boolean;

    @Column({ default: "" })
    response: string;

    @ManyToOne(() => User, (user) => user.messages)
    user: User;

    @ManyToOne(() => User, (user) => user.messages, { nullable: true })
    operator: User;

    @ManyToOne(() => Room, (room) => room.messages)
    room: Room;

}