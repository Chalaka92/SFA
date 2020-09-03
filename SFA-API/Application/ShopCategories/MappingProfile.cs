using AutoMapper;
using Domain;

namespace Application.ShopCategories
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.Command, ShopCategory>();
        }
    }
}