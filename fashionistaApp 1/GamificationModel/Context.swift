//
//  Context.swift
//  fashionistaApp
//
//  Created by Daniel Leibman on 07/03/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import Foundation

class Context {
    
    var id : String?
    var caption : String?
    
}



extension Context{
    static func TransformContext(dict:[String : Any], key: String) -> Context {
        let c = Context()
        c.caption = dict["Caption"] as? String
        c.id = key
        return c
    }
}
