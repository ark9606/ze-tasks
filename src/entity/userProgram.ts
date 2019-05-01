import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Length } from 'class-validator';
import { Todo } from './todo';
import { User } from './user';
import { Program } from './program';

@Entity('userPrograms')
export class UserProgram {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0, type: 'bigint' })
  progress: number;

  @Column({
    type: 'date',
    nullable: true
  })
  start: Date;

  @ManyToOne(type => Program)
  @JoinColumn()
  program: Program;


  @ManyToOne(type => User)
  @JoinColumn()
  user: User;

  // @ManyToOne(type => Program, program => program.users)
  // program: Program;

  // @ManyToOne(type => User, user => user.programs)
  // user: User;
  
}