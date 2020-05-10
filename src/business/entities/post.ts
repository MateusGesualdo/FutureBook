export default class Post {
  constructor(
    private id: string,
    private authorId: string,
    private description: string,
    private creationDate: string,
    private type: PostType,
    private image: string
  ) { }

  public getId = (): string => this.id;
  public getAuthorId = (): string => this.authorId
  public getDescription = (): string => this.description
  public getType = (): PostType => this.type
  public getCreationDate = (): string => this.creationDate
  public getImage = (): string | undefined => this.image

}

export enum PostType {
  normal = "NORMAL",
  event = "EVENT"
}
