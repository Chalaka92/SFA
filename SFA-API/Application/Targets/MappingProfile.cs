using AutoMapper;
using Domain;

namespace Application.Targets
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.Command, Target>();
            CreateMap<Target, TargetDto>();
        }
    }
}