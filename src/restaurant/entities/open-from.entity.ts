import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { IOpenFrom } from '../value-objects/open-from.value-object';
import RestaurantEntity from './restaurant.entity';

@Entity('open_from')
class OpenFromEntity implements IOpenFrom {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: 'simple-array',
  })
  readonly days!: string[];

  @Column({
    type: 'simple-array',
  })
  readonly hours!: string[][];

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.openFrom, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  restaurant!: RestaurantEntity;

  @DeleteDateColumn({
    select: false,
    name: 'deleted_at',
  })
  deletedAt?: Date;
}

export default OpenFromEntity;
