import fs from 'fs';
import moment from 'moment-timezone';
const lastReference = new Date('Thu Jul 8 10:26:00 2022');
const rightNow = new Date();
const millisBetween = rightNow.getTime() - lastReference.getTime();

if (millisBetween <= 360000) {
  console.log('green');
} else {
  if (millisBetween <= 1860000) {
    console.log('yellow');
  } else {
    console.log('red');
  }
}
