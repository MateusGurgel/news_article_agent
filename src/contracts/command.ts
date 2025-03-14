export abstract class Command<DTO, ResponseDTO> {
    abstract handle(dto: DTO): Promise<ResponseDTO> | ResponseDTO
}