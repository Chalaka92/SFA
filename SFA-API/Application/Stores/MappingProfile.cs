using AutoMapper;
using Domain;

namespace Application.Stores
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.Command, Store>();
            CreateMap<Store, StoreDto>();
            CreateMap<StoreContact, StoreContactDto>();
            CreateMap<StoreEmail, StoreEmailDto>();
            CreateMap<StoreAddress, StoreAddressDto>();
        }
    }
}