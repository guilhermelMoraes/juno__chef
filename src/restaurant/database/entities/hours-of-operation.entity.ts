import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import RestaurantEntity from './restaurant.entity';
import { HoursOfOperation } from '../../restaurant.model';

@Entity('hours_of_operation')
class HoursOfOperationEntity implements HoursOfOperation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('simple-array')
  days!: string[];

  @Column('simple-array')
  hours!: string[][];

  @ManyToOne(
    () => RestaurantEntity,
    (restaurant) => restaurant.hoursOfOperation,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  restaurant!: RestaurantEntity;

  @DeleteDateColumn({
    select: false,
    name: 'deleted_at',
  })
  deletedAt!: Date;
}

export default HoursOfOperationEntity;
