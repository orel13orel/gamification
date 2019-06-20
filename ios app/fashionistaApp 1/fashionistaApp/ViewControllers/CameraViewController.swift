//
//  CameraViewController.swift
//  fashionistaApp
//
//  Created by Studio on 11/12/2018.
//  Copyright © 2018 Studio. All rights reserved.
//

import UIKit
import ProgressHUD
import FirebaseStorage
import FirebaseDatabase
import FirebaseAuth
import MapKit
import FirebaseFunctions


class CameraViewController: UIViewController , CLLocationManagerDelegate {

    @IBOutlet weak var Photo: UIImageView!
    @IBOutlet weak var TextView: UITextView!
    @IBOutlet weak var ShareBtn: UIButton!
    @IBOutlet weak var CancelButton: UIBarButtonItem!
    var selectedImage: UIImage?
    var locationManager = CLLocationManager()
    var longtitude : Double?
    var latitude :Double?
    
    var functions = Functions.functions()

    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.locationManager.requestWhenInUseAuthorization()
        
        if CLLocationManager.locationServicesEnabled(){
            locationManager.delegate = self
            locationManager.desiredAccuracy = kCLLocationAccuracyNearestTenMeters
            locationManager.startUpdatingLocation()
        }
    
        let TapGesture = UITapGestureRecognizer(target: self, action: #selector(self.SelectPhoto))
        Photo.addGestureRecognizer(TapGesture)
        Photo.isUserInteractionEnabled = true
    }
    
    @IBAction func CancelBtn(_ sender: Any) {
        clean()
        handlePost()
    }
    
    func clean() {
        self.TextView.text = ""
        self.Photo.image = UIImage(named: "placeholder-photo")
        self.selectedImage = nil
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        handlePost()
    }
    
    
    func handlePost() {
        if selectedImage != nil {
            self.ShareBtn.isEnabled = true
            self.CancelButton.isEnabled = true
            self.ShareBtn.backgroundColor = UIColor.init(red: 0, green: 0, blue: 0, alpha: 1)
        }
        else{
            self.ShareBtn.isEnabled = false
            self.CancelButton.isEnabled = false
              self.ShareBtn.backgroundColor = .lightGray
        }
    }
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        view.endEditing(true)
    }
    
    @objc func SelectPhoto() {
        let PickImageController = UIImagePickerController()
        PickImageController.allowsEditing = true
        PickImageController.delegate = self
        present(PickImageController, animated: true, completion: nil)
    }
    
    func locationManager (_ manager: CLLocationManager , didUpdateLocations location :[CLLocation]){
        let localValue: CLLocationCoordinate2D = manager.location!.coordinate
        print("locations \(localValue.latitude) \(localValue.longitude)")
 //       latitude = localValue.latitude
 //       longtitude = localValue.longitude
    }
    
    
    @IBAction func ShareButton(_ sender: Any) {
        
        view.endEditing(true)
        ProgressHUD.show("waiting", interaction: false)
      if let profileImage = self.selectedImage, let imageData = UIImageJPEGRepresentation(profileImage, 0.1) {
        

        HelpService.uploadToserver(data: imageData, caption: TextView.text!, lat: 37.785834 ,long: -122.406417 , onSuccess: {
            
            self.clean()
            self.tabBarController?.selectedIndex = 0
        })
        
        /*
        HelpService.uploadToserver(data: imageData, caption: TextView.text!, lat: latitude! ,long: longtitude! , onSuccess: {
       
            self.clean()
            self.tabBarController?.selectedIndex = 0
        })*/
        
       /*     let photoIDstring = NSUUID().uuidString
            print(photoIDstring)
            let storageRef = Storage.storage().reference(forURL: configuration.Conf_storage_root).child("Posts").child(photoIDstring)
            storageRef.putData(imageData, metadata: nil, completion: { (metadata, error) in
                if error != nil {
                    ProgressHUD.showError(error!.localizedDescription)
                    return
                }
                storageRef.downloadURL(completion: { (url: URL?, error: Error?) in
                    let photoUrl = url?.absoluteString
                    self.sendDataToDatabase(photoUrl : photoUrl!)
                })
        })*/
        } else {
            ProgressHUD.showError("profile picture can not be empty")
        }
        
        var text =  Auth.auth().currentUser?.uid
        self.functions.httpsCallable("addUserActivityApp").call(["text":text!+"/-Lbr4afUT1Q8GM8Wfzhm/-Lbr-1NUNlyOVz4qRj2p"]) { (result, error) in
            if let error = error as NSError? {
                if error.domain == FunctionsErrorDomain {
                    let code = FunctionsErrorCode(rawValue: error.code)
                    let message = error.localizedDescription
                    let details = error.userInfo[FunctionsErrorDetailsKey]
                }
                
            }
            if let text = (result?.data as? [String:Any])? ["text"] as? String {
                //   SignUpBtn.
                
                let    str = text
            }
        }
        
    }
    
    func sendDataToDatabase(photoUrl: String) {
  /*      let ref = Database.database().reference()
        let postsRef = ref.child("Posts")
        let newPostId = postsRef.childByAutoId().key
        let newpostRef = postsRef.child(newPostId!)
        guard let currentUser  = Auth.auth().currentUser else {
            return
        }
        let currentUserID = currentUser.uid
        newpostRef.setValue(["uid": currentUserID, "photoUrl" : photoUrl, "caption" : TextView.text!] ) { (error, ref) in
            if error != nil {
                ProgressHUD.showError(error!.localizedDescription)
                return
            }
            let Mypost_ref = API.Myposts.Ref_mypost.child(currentUserID).child(newPostId!)
            Mypost_ref.setValue(true, withCompletionBlock: { (error, ref) in
                if error != nil {
                    ProgressHUD.showError(error!.localizedDescription)
                    return
                }
            })
            ProgressHUD.showSuccess("Success")
            self.clean()
            self.tabBarController?.selectedIndex = 0
        }
 */
    }
    
}

extension CameraViewController: UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        print("did finish")
        if let image = info["UIImagePickerControllerOriginalImage"] as? UIImage {
            selectedImage = image
            Photo.image = image
        }
        dismiss(animated: true, completion: nil)
    }
}
