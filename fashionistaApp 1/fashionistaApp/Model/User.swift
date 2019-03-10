//
//  User.swift
//  fashionistaApp
//
//  Created by admin on 26/12/2018.
//  Copyright © 2018 Studio. All rights reserved.
//

import Foundation


class User{
    
    var Email: String?
    var FullName : String?
    var Password : String?
    var Username: String?
    var profilePicture: String?
    var id: String?
    var isfollowing: Bool?
    var sumOfPoints: Int?
    var badges: [Badge]?
    

}
extension User{
    static func TransformUser(dict:[String : Any], key: String) -> User {
        let user = User()
        user.Email = dict["Email" ] as? String
        user.FullName = dict["FullName" ] as? String
        user.Password = dict["Password" ] as? String
        user.Username = dict["Username" ] as? String
        user.profilePicture = dict["profilePicture" ] as? String
        user.sumOfPoints = dict["SumOfPoints"] as? Int
        user.badges = dict["Badge"] as? [Badge]
        //user.badges?.append(dict)
        user.id = key
        return user
    }
}
