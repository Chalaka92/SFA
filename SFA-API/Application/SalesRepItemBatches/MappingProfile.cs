using AutoMapper;
using Domain;

namespace Application.SalesRepItemBatches
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.Command, SalesRepItemBatch>();
            CreateMap<SalesRepItemBatch, SalesRepItemBatchDto>();
        }
    }
}