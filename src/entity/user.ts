import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Length, IsEmail } from 'class-validator';
import { Todo } from './todo';
import { Program } from './program';
import { UserProgram } from './userProgram';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 80
    })
    @Length(4, 80)
    name: string;

    @Column({
        length: 100,
        unique: true
    })
    @Length(4, 100)
    @IsEmail()
    email: string;

    @Column({
        length: 256
    })
    @Length(10, 256)
    accessToken: string;

    @Column({
        length: 256
    })
    @Length(2, 256)
    fbID: string;

    @Column({
        length: 256
    })
    @Length(2, 256)
    avatar: string;

    @Column({
        type: 'bigint',
        default: 0
    })
    experience: number;

    @OneToMany(type => Todo, todo => todo.user, {
        cascade: true
    })
    todos: Todo[];

    // @ManyToMany(type => Program, program => program.users)
    // @JoinTable()

    // @OneToMany(type => UserProgram, userProgram => userProgram.users, {
    //     cascade: true
    // })
    // programs: UserProgram[];

}
