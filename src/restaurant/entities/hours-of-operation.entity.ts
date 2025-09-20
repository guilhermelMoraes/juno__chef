import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import RestaurantEntity from "./restaurant.entity";

@Entity('hours_of_operation')
class HoursOfOperationEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('simple-array')
  days!: string[];

  @Column('simple-array')
  hours!: string[];

  @ManyToOne(
    () => RestaurantEntity,
    (restaurant) => restaurant.hoursOfOperation,
    { cascade: true },
  )
  restaurant!: RestaurantEntity;
}

export default HoursOfOperationEntity;
