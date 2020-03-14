// externals
import { Request, Response } from "express";
import * as HttpStatus from "http-status-codes";
import { CreateOptions, FindOptions, Order, Transaction } from "sequelize";

// utils
import { buildSelfLink } from "../../utils/linkBuilder";
import { buildErrorForApiResponse } from "../utils/errorProcessor";

// data access
import { mapToBacklogItem, BacklogItemModel } from "../../dataaccess";
import { sequelize } from "../../dataaccess/connection";

// interfaces/types
import { BacklogItem } from "../../dataaccess/types";
import { addIdToBody } from "../utils/uuidHelper";

export const backlogItemsGetHandler = function(req: Request, res: Response) {
    const order: Order = [["displayIndex", "ASC"]];
    const options: FindOptions = { order };
    BacklogItemModel.findAll(options)
        .then((backlogItems) => {
            const items = backlogItems.map((item) => {
                const backlogItem = mapToBacklogItem(item);
                const result: BacklogItem = {
                    ...backlogItem,
                    links: [buildSelfLink(backlogItem, "/api/v1/backlog-items/")]
                };
                return result;
            });
            res.json({
                status: HttpStatus.OK,
                data: {
                    items
                }
            });
        })
        .catch((error) => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: {
                    msg: error
                }
            });
            console.log(`unable to fetch backlog items: ${error}`);
        });
};

export const backlogItemsPostHandler = function(req: Request, res: Response) {
    const bodyWithId = addIdToBody(req.body);
    return sequelize.transaction(
        { isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE },
        async (transaction: Transaction) => {
            try {
                const addedBacklogItem = await BacklogItemModel.create(bodyWithId, { transaction } as CreateOptions);
                res.status(HttpStatus.CREATED).json({
                    status: HttpStatus.CREATED,
                    data: {
                        item: addedBacklogItem
                    }
                });
            } catch (error) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: buildErrorForApiResponse(error)
                });
                console.log(`unable to add backlog item: ${error}`);
            }
        }
    );
};
