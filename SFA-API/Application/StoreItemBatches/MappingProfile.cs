using AutoMapper;
using Domain;

namespace Application.StoreItemBatches
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.Command, StoreItemBatch>();
            CreateMap<StoreItemBatch, StoreItemBatchDto>();
        }
    }
}