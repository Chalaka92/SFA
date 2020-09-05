using AutoMapper;
using Domain;

namespace Application.UserSpecificDetails
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.Command, UserSpecificDetail>();
        }
    }
}