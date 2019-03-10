//
//  Badge.swift
//  fashionistaApp
//
//  Created by Daniel Leibman on 07/03/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import Foundation


class Badge{
    var caption : String?
    var photoUrl : String?
    var id: String?
    
        
    

}
extension Badge{
    static func TransformPoint(dict:[String : Any], key: String) -> Badge {
        let b = Badge()
        b.id = key
        b.caption = dict["Caption" ] as? String
        b.photoUrl = dict["PhotoUrl" ] as? String
        return b
    }
}
