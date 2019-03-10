//
//  Point.swift
//  fashionistaApp
//
//  Created by Daniel Leibman on 07/03/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import Foundation



class Point{
    
    var point: Int?
    var id: String?
    
}
extension Point{
    static func TransformPoint(dict:[String : Any], key: String) -> Point {
        let p = Point()
        p.id = key
        p.point = dict["Point" ] as? Int
        return p
    }
}
