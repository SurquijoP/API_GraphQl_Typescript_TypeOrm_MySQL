import { GraphQLID, GraphQLInt, GraphQLList } from "graphql";
import { Users } from "../../Entities/User";
import { userType } from "../typeDef/User";

export const GET_ALL_USERS = {
    type: new GraphQLList(userType),
    async resolve(){
        const result = await Users.find()
        return result;
    }
}
export const GET_USER = {
    type: userType,
    args:{
        id:{type: GraphQLID}
    },
    async resolve( _: any, args: any){
    
    return await Users.findOne({where: {id: args.id}})
    
}}


    