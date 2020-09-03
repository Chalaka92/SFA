using AutoMapper;
using Domain;

namespace Application.UserDetails
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.Command, UserDetail>();
        }
    }
}