using AutoMapper;
using Domain;

namespace Application.SalesReps
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.Command, SalesRep>();
            CreateMap<SalesRep, SalesRepDto>();
        }
    }
}