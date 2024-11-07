import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Welcome to the EG galaxy of best e-learning authoring tool! but I think you're ran out of oxygen.`;
  }
}
