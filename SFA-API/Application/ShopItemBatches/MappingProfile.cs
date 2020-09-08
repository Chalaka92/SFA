using AutoMapper;
using Domain;

namespace Application.ShopItemBatches
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.Command, ShopItemBatch>();
            CreateMap<ShopItemBatch, ShopItemBatchDto>();
        }
    }
}