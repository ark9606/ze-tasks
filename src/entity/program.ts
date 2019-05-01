import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Length } from 'class-validator';
import { Todo } from './todo';
import { User } from './user';
import { UserProgram } from './userProgram';

@Entity('programs')
export class Program {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40 })
  @Length(1, 40)
  name: string;

  @Column({ length: 200 })  
  @Length(1, 200)
  description: string;

  @Column({ length: 40 })
  @Length(1, 40)
  image: string;

  @Column({ type: 'smallint' })
  @Length(1, 40)
  difficulty: number;

  @OneToMany(type => Todo, todo => todo.program, {
    cascade: true
  })
  todos: Todo[];

  // @ManyToMany(type => User, user => user.programs)
  // @OneToMany(type => UserProgram, userProgram => userProgram.programs, {
  //   cascade: true
  // })
  // users: UserProgram[];

}