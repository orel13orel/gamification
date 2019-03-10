//
//  Action.swift
//  fashionistaApp
//
//  Created by Daniel Leibman on 07/03/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import Foundation


class Action {
    
    var id : String?
    var caption : String?
    
}



extension Action{
    static func TransformAction(dict:[String : Any], key: String) -> Action {
        let a = Action()
        a.caption = dict["Caption"] as? String
        a.id = key
        return a
    }
}
