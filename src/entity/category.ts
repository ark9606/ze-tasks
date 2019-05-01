import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Length, IsOptional } from 'class-validator';
import { Todo } from './todo';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;


    @Column({
        length: 20
    })
    @Length(1, 20)
    name: string;

    @Column({
        length: 200,
        nullable: true
    })
    @IsOptional()
    @Length(1, 200)
    image: string;


    @OneToMany(type => Todo, todo => todo.category, {
        cascade: true
    })
    todos: Todo[];
}
