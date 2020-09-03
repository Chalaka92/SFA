using AutoMapper;
using Domain;

namespace Application.Shops
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.Command, Shop>();
        }
    }
}