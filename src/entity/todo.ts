import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Length, IsOptional } from 'class-validator';
import { User } from './user';
import { Category } from './category';
import { Program } from './program';


@Entity('todos')
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'boolean',
        default: false
    })
    done: boolean;

    @Column({
        length: 80
    })
    @Length(3, 80)
    name: string;

    @Column({
        length: 200,
        nullable: true
    })
    @IsOptional()
    @Length(1, 200)
    description: string;

    @Column({
        type: 'date',
        nullable: true
    })
    date: Date;

    @Column({
        type: 'time',
        nullable: true
    })
    time: Date;

    @Column({
        nullable: true        
    })
    @IsOptional()
    @Length(4, 20)
    repeat: string;

    @ManyToOne(type => User, user => user.todos, {
        nullable: true
    })
    user: User;

    @ManyToOne(type => Category, category => category.todos, {
        nullable: true
    })
    category: Category;

    @ManyToOne(type => Program, program => program.todos, {
        nullable: true
    })
    program: Program;

    static get REPEAT_TYPE() {
        return {
            daily: 86400000,
            weekly: 604800000,
        }
    }
}
