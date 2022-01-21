import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchLogEntity } from './search-log.entity';

@Injectable(

)
export class SearchLogService {

    constructor(@InjectRepository(SearchLogEntity) private searchRepository: Repository<SearchLogEntity>) {

    }

    async getAll(): Promise<SearchLogEntity[]> {
        return await this.searchRepository.find();
    }

    async getDataById(id) {
        return await this.searchRepository.findByIds(id);
    }

    async createData(data: SearchLogEntity) {
        return this.searchRepository.save(data)
    }

    async updatePreview(id) {
        this.searchRepository.findByIds(id).then(res => {
            this.searchRepository.update(id, res[0])

        })
    }
}
