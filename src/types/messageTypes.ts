

export interface messageCard {
    name?: string;
    content: string;
    createdAt: Date | string;
    _id?:string
    handleDelete?:(id:string)=>void

  }

export  interface MessageT{
    content:string,
    createdAt:Date | string,
    _id:string
}