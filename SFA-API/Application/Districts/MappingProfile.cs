using AutoMapper;
using Domain;

namespace Application.Districts
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.Command, District>();
        }
    }
}