export default class Post {
  constructor(
    private id: string,
    private authorId: string,    
    private description: string,
    private creationDate: string,
    private type: PostType,    
    private image: string
  ) {}

  public getId(): string {
    return this.id;
  } 

  public getAuthorId(): string {
    return this.authorId;
  }  

  public getDescription(): string {
    return this.description;
  }  

  public getType(): PostType {
    return this.type;
  }

  public getCreationDate(): string {
    return this.creationDate;
  }
  
  public getImage(): string | undefined {
    return this.image;
  }
  
}

export enum PostType {
  normal = "normal",
  event = "event"
}
