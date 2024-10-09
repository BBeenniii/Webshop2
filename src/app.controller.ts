import { Controller, Get, Post, Body, Render, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('form')
  getForm() {
    return {};
  }

  @Post('/submit')
  @Redirect('/')
  async submitForm(@Body() body) {
    const { name, bankAccount, termsAccepted } = body;
    if (!this.appService.validateForm(name, bankAccount, termsAccepted)) {
      return { url: '/error' }; 
    }

    await this.appService.saveToCsv(name, bankAccount);
    return { url: '/success' };
  }

  @Get('/success')
  @Render('success')
  getSuccess() {
    return { message: 'Az adatok sikeresen mentésre kerültek!' };
  }

  @Get('/error')
  @Render('error')
  getError() {
    return { message: 'Hibás adatokat adott meg!' };
  }
}