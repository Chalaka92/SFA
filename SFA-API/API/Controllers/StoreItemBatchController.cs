using System.Collections.Generic;
using System.Threading.Tasks;
using Application.StoreItemBatches;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class StoreItemBatchController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<StoreItemBatchDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("ListByStoreId/{storeId}")]
        public async Task<ActionResult<List<StoreItemBatchDto>>> ListByStoreId(int storeId)
        {
            return await Mediator.Send(new ListByStoreId.Query { StoreId = storeId });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StoreItemBatchDto>> Details(int id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromBody] Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(int id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(int id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }
    }
}