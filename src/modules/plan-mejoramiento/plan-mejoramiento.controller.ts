import { Controller, Get, Post, Put, Body, Param, ParseIntPipe, UploadedFile, UseInterceptors, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlanMejoramientoEntity } from 'src/db/entities';
import { PlanMejoramientoService } from './plan-mejoramiento.service';
import { CreatePlanMejoramientoDto, UpdatePlanMejoramientoDTO } from './dto/plan-mejoramiento-dto';
import { diskStorage } from 'multer';
@Controller('plan-mejoramiento')
export class PlanMejoramientoController {

    constructor(private planMejoramientoService: PlanMejoramientoService) { }

    //  @Get()
    //  getPlan(): Promise<PlanMejoramientoEntity[]>{
    //      return this.planMejoramientoService.getPlan();
    //  }
    @Get()
    getPlan(): Promise<PlanMejoramientoEntity[]> {
        return this.planMejoramientoService.getPlan();
    }

    @Get("aprendiz/:id")
    async getPlanAprendiz(@Param("id", ParseIntPipe) id: number) {
        return await this.planMejoramientoService.getPlanAprendiz(id);
    }

    @Get('/inactivo')
    async getInactivo(): Promise<PlanMejoramientoEntity[]> {
        return this.planMejoramientoService.getInactivo();
    }

    @Get(':id')
    getOnePlan(@Param('id') id: number): Promise<PlanMejoramientoEntity> {
        return this.planMejoramientoService.getOnePlan(id);
    }

    @Get("motivos/:id")
    async getDecision(@Param('id', ParseIntPipe) id: number) {
        return this.planMejoramientoService.getDecision(id)
    }

    @Post()
    createPlan(@Body() newPlan: CreatePlanMejoramientoDto) {
        return this.planMejoramientoService.createPlan(newPlan);
    }

    @Delete(':id')
    deletePlan(@Param('id', ParseIntPipe) id: number) {
        return this.planMejoramientoService.deletePlan(id);
    }

    @Post(':id')
    async actualizarPlan(@Param('id', ParseIntPipe) id: number, @Body() plan: UpdatePlanMejoramientoDTO) {
        return await this.planMejoramientoService.actualizarPlan(id, plan);
    }

    @UseInterceptors(
        FileInterceptor(
            "file",
            {
                storage: diskStorage({
                    destination: './uploads/comite/planMejora',
                    filename: function (req, file, cb) {
                        cb(null, `${Date.now()}_${file.originalname}`)
                    }
                })
            }
        )
    )

    @Post('upload/archivo')
    async uploadArchivoPlan(@UploadedFile() file: Express.Multer.File, @Body() plan: UpdatePlanMejoramientoDTO) {
        const planM = {
            archivoPlanMejoramiento: file.filename,
        }
        return await this.planMejoramientoService.actualizarPlan(plan.trimestre, planM);
        // msg : `Archivo ${file.filename} cargando correctamente`
    }

    @Post('inactivo/:id')
    async cambiarEstado(@Param('id', ParseIntPipe) id: number) {
        return this.planMejoramientoService.cambiarEstado(id);
    }


}
