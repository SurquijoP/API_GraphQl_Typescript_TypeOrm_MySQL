import { GraphQLBoolean, GraphQLID, GraphQLString } from "graphql";
import { Users } from "../../Entities/User";
import { userType } from "../typeDef/User";
import bcrypt from 'bcryptjs';

export const CREATE_USER = {
    type: userType,
    args: {
       name: {type: GraphQLString},
       username: {type: GraphQLString},
       password: {type: GraphQLString},
    },
    async resolve(_: any, args: any) {
        const {name , username, password} = args;


        const encryptPassword = await bcrypt.hash(password, 10)
        const result = await Users.insert({
            name: name,
            username: username,
            password: password,
        })
        console.log(result);
        return {...args, id: result.identifiers[0].id,
        password: encryptPassword}
    }
};

    export const DELETE_USER = {
        type: GraphQLBoolean,
        args: {
            id:{type: GraphQLID}
        },
        async resolve(_: any, {id}: any){
        const result = await Users.delete(id);
         if(result.affected === 1) return true;
        return false
        }
    }

    export const UPDATE_USER = {
        type: GraphQLBoolean,
        args: {
            id: {type: GraphQLID},
            name: {type: GraphQLString},
            username: {type: GraphQLString},
            password: {type: GraphQLString},
        },
        async resolve(_: any, {id, name, username, password,oldPassword, newPassword}: any){
            
           const userFound = await Users.findOneBy({id: id});
           const newPasswordHash = await bcrypt.hash(password, 10);
           const response = await Users.update({id}, {username, name, password: newPasswordHash});
           return true
        }
    }