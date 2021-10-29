import { Request, Response } from 'express';

export const Blank =
	(use404: boolean = false) =>
	(_req: Request, res: Response) => {
		res.status(use404 ? 404 : 200).send();
	};
