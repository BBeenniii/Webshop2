import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppService {
  validateForm(name: string, bankAccount: string, termsAccepted: boolean): boolean {
    const nameRegex = /\S+|^[a-zA-Z]+$/; 
    const accountRegex = /^(\d{8}-\d{8}|\d{8}-\d{8}-\d{8})$/;

    if (!nameRegex.test(name) || !accountRegex.test(bankAccount) || !termsAccepted) {
      return false;
    }
    return true;
  }

  async saveToCsv(name: string, bankAccount: string) {
    const csvPath = path.join(__dirname, '..', 'data.csv');
    const data = `${name},${bankAccount}\n`;

    fs.appendFile(csvPath, data, (err) => {
      if (err) throw err;
    });
  }
}