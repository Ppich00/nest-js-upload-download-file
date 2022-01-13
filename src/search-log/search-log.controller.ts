import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { SearchLogEntity } from './search-log.entity';
import { SearchLogService } from './search-log.service';

@Controller('searchLog')
export class SearchLogController {

    constructor(private service: SearchLogService) { }

    @Get()
    getAll() {
        this.service.getAll().then(res => console.log(res)
        )
        return this.service.getAll()
    }

    @Get(':id')
    getById(@Param('id') id: number) {
    
        return this.service.getDataById(id)
    }

    @Post()
    create(@Body() user: SearchLogEntity) {
        console.log(user);

        return this.service.createUser(user);
    }

    
}
