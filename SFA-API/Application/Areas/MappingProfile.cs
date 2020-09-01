using AutoMapper;
using Domain;

namespace Application.Areas
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.Command, Area>();
        }
    }
}