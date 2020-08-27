using AutoMapper;
using Domain;

namespace Application.Values
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Value, ValueDto>();
            CreateMap<Create.Command, Value>();
        }
    }
}