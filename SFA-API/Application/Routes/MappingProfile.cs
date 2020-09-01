using AutoMapper;
using Domain;

namespace Application.Routes
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.Command, Route>();
        }
    }
}