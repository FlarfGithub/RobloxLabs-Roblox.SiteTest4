import { Task } from '../../../../System/Threading/Task';
import { Connection, createConnection } from 'mysql';
import { PartialEntity } from './PartialEntity';

export class PartialDatabase {
	private name_: string;
	private username_: string;
	private connection_: Connection;
	private connected_: boolean;
	public constructor(name: string, username: string, password: string) {
		this.name_ = name.toLowerCase();
		this.username_ = username;
		this.connected_ = false;
		this.connection_ = createConnection({
			host: 'localhost',
			user: username,
			password: password,
			database: name,
		});
	}

	public GetTable<TEntity>(
		name: string,
		primaryKey: string,
		autoIncrementPK: boolean = false,
	): [boolean, string, PartialEntity<TEntity>] {
		if (!this.connected_) return [false, 'The database has not been connected to yet.', null];
		return [true, '', new PartialEntity<TEntity>(this.name_, name, primaryKey, autoIncrementPK, this.connection_)];
	}
	public async Connect(): Task<[boolean, string]> {
		return new Promise<[boolean, string]>((resumeFunction) => {
			if (this.connection_)
				this.connection_.connect((err) => {
					if (err) {
						this.connected_ = false;
						return resumeFunction([
							false,
							`Cannot open database "${this.name_}" requested by the login. The login failed. ${err.message}\r\nLogin failed for user '${this.username_}'.`,
						]);
					}
					this.connected_ = true;
					resumeFunction([true, '']);
				});
			else resumeFunction([true, '']);
		});
	}
	public async Disconnect(): Task<[boolean, string]> {
		return new Promise<[boolean, string]>((resumeFunction) => {
			if (this.connected_ && this.connection_) {
				this.connection_.destroy();
				this.connected_ = false;
			}
			resumeFunction([true, '']);
		});
	}
}
