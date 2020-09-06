using AutoMapper;
using Domain;

namespace Application.Shops
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.Command, Shop>();
            CreateMap<Shop, ShopDto>();
            CreateMap<ShopContact, ShopContactDto>();
            CreateMap<ShopEmail, ShopEmailDto>();
            CreateMap<ShopAddress, ShopAddressDto>();
        }
    }
}