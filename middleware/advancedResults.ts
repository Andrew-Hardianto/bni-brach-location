import { Request, Response, NextFunction } from 'express';
import db from '../config/db';
const Op = db.Sequelize.Op;

const advancedResults = (model: any, options: { include?: string[], searchableField?: string } = {}) => async (req: Request, res: Response, next: NextFunction) => {
    let queryOptions: any = {};

    if (options.include) {
        queryOptions.include = options.include;
    }

    if (req.query.keyword && options.searchableField) {
        queryOptions.where = {
            [options.searchableField]: {
                [Op.like]: `%${req.query.keyword}%`
            }
        };
    }

    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    queryOptions.offset = (page - 1) * limit;
    queryOptions.limit = limit;

    try {
        const { count, rows } = await model.findAndCountAll(queryOptions);
        // Expose pagination in res.advancedResults so the controller can use it
        (res as any).advancedResults = {
            success: true,
            data: rows,
            pagination: {
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                limit: limit
            }
        };

        next();
    } catch (error) {
        next(error);
    }
};

export default advancedResults;
