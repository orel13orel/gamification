//
//  PostLocationViewController.swift
//  fashionistaApp
//
//  Created by Studio on 05/02/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import UIKit
import GoogleMaps
class PostLocationViewController: UIViewController  {

    
    @IBOutlet weak var map: GMSMapView!
    var postId: String!
    
    let geocoder = GMSGeocoder()
    
    @IBOutlet weak var spinner: UIActivityIndicatorView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        map.delegate = self
        
        
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        
    }
    
    override func loadView() {
        super.loadView()
        
        
        print("fugfyufuyvhuvghjvghjkghjkvghjkvgkcghj")
        //spinner.startAnimating()
        API.Post.observePost(withId: postId) { (post) in
           // print("location : \(post.lat),\(post.long)")
            
            
            
        
            let camera = GMSCameraPosition.camera(withLatitude: post.lat!, longitude: post.long!, zoom: 10.0)
            
            //let mapView = GMSMapView.map(withFrame: CGRect.zero, camera: camera)
            self.map.camera = camera
            
            let marker = GMSMarker(position: CLLocationCoordinate2D(latitude: post.lat!, longitude: post.long!))

            self.map.selectedMarker = marker
        
//            let camera = GMSCameraPosition.camera(withLatitude: post.lat!, longitude: post.long!, zoom: 6.0)
//            let mapView = GMSMapView.map(withFrame: CGRect.zero, camera: camera)
//            self.map.camera = camera
//            let marker = GMSMarker()
//            marker.position = CLLocationCoordinate2D(latitude: post.lat!, longitude: post.long!)
//
//            marker.map = mapView
           
        }
    }
    
}




extension PostLocationViewController :GMSMapViewDelegate{
    func mapView(_ mapView: GMSMapView, willMove gesture: Bool) {
        mapView.clear()
    }
    func mapView(_ mapView: GMSMapView, idleAt cameraPosition: GMSCameraPosition) {
        geocoder.reverseGeocodeCoordinate(cameraPosition.target) { (response, error) in
            guard error == nil else {
                return
            }
            
            if let result = response?.firstResult() {
                let marker = GMSMarker()
                marker.position = cameraPosition.target
                marker.title = result.lines?[0]
                //marker.snippet = result.lines?[1]
                marker.map = mapView
            }
        }
    }
}
